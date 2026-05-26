const PREAMBLE_PATTERNS = [
  /^(here(?:'s| is)?\s*(?:the|your)?\s*(?:skill|markdown|output|response|result)[\s:]*)/im,
  /^(ok(?:ay)?[,\s]*)/im,
  /^(certainly!?\s*)/im,
  /^(sure!?\s*)/im,
  /^(of course!?\s*)/im,
  /^(i hope this helps[!.]?\s*)/im,
  /^(let me know if you need[^.]+[.!]?\s*)/im,
  /^(feel free to[^.!]+[.!]?\s*)/im,
]

const CONCLUSION_PATTERNS = [
  /\n*(i hope this helps[!.]?)$/im,
  /\n*(let me know if you need[^.!]+[.!]?)$/im,
  /\n*(feel free to[^.!]+[.!]?)$/im,
  /\n*(this should[^.!]+[.!]?)$/im,
  /\n*(if you have any questions[^.!]+[.!]?)$/im,
]

export function formatMarkdownResponse(raw: string): string {
  let content = raw.trim()

  if (!content) return '# Skill\n\nNo content generated.\n'

  content = extractFencedMarkdown(content)

  content = stripPreamble(content)

  content = stripConclusion(content)

  if (!hasMarkdownStructure(content)) {
    content = wrapAsSkill(content)
  }

  content = normalizeHeadings(content)

  content = normalizeWhitespace(content)

  content = normalizeCodeBlocks(content)

  content = fixListSpacing(content)

  return content.trim() + '\n'
}

function hasMarkdownStructure(text: string): boolean {
  if (/^#{1,6}\s/m.test(text)) return true
  const lines = text.split('\n').filter(l => l.trim())
  if (lines.length < 3) return false
  return true
}

function wrapAsSkill(text: string): string {
  let body = text.trim()
  if (!body.startsWith('```')) {
    const lines = body.split('\n')
    if (lines.length === 1 && (body.startsWith('$ ') || body.startsWith('curl') || body.startsWith('npm') || body.startsWith('bun') || body.startsWith('pip') || body.startsWith('wget'))) {
      body = '```bash\n' + body.replace(/^\$\s*/, '') + '\n```'
    }
  }

  return `# Quick Start

## Overview

Automates the setup and execution of this technology.

## Instructions

Run the following command:

${body}

## Notes

- Ensure prerequisites are installed
- Verify the command succeeded before proceeding
`
}

function extractFencedMarkdown(text: string): string {
  const fenceMatch = text.match(/```(?:markdown|md)?\s*\n?([\s\S]*?)\n?```/)
  if (fenceMatch?.[1]?.trim().length) {
    return fenceMatch[1].trim()
  }

  const fenced = text.match(/```[\w]*\s*\n?([\s\S]*?)\n?```/)
  if (fenced?.[1]?.trim().length) {
    return fenced[1].trim()
  }

  return text
}

function stripPreamble(text: string): string {
  let result = text

  for (const pattern of PREAMBLE_PATTERNS) {
    result = result.replace(pattern, '')
  }

  const headingMatch = result.match(/^#{1,6}\s/)
  const meaningfulStart = result.search(/^(#{1,6}\s|[\*\-\+]\s|\d+\.\s|>`)/m)
  if (meaningfulStart > 0 && (headingMatch || meaningfulStart < 200)) {
    result = result.slice(meaningfulStart)
  }

  return result.trim()
}

function stripConclusion(text: string): string {
  let result = text

  for (const pattern of CONCLUSION_PATTERNS) {
    result = result.replace(pattern, '')
  }

  return result.trim()
}

function normalizeHeadings(text: string): string {
  const lines = text.split('\n')

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]!
    if (/^#{1,6}\s/.test(line) && i > 0 && lines[i - 1]!.trim() !== '') {
      lines[i] = '\n' + line
    }
  }

  return lines.join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/^(\n+)/, '')
}

function normalizeWhitespace(text: string): string {
  return text
    .replace(/\t/g, '  ')
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .replace(/[ \t]+$/gm, '')
    .replace(/\n{4,}/g, '\n\n\n')
}

function normalizeCodeBlocks(text: string): string {
  const lines = text.split('\n')
  const result: string[] = []

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]!
    result.push(line)

    if (line.trimStart().startsWith('```')) {
      if (i < lines.length - 1 && lines[i + 1]!.trim() === '') {
        const lang = line.trimStart().slice(3).trim()
        if (!lang) {
          result.pop()
          continue
        }
      }
    }
  }

  return result.join('\n')
}

function fixListSpacing(text: string): string {
  return text.replace(/([^\n])\n([\*\-\+]\s|\d+\.\s)/g, '$1\n\n$2')
}
