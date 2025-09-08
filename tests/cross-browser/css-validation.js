#!/usr/bin/env node

/**
 * CSS Validation Script for Cross-Browser Compatibility
 * Analyzes the design system CSS for potential browser compatibility issues
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// CSS features and their browser support
const CSS_FEATURES = {
  'oklch(': {
    name: 'OKLCH Color Space',
    support: {
      chrome: 111,
      firefox: 113,
      safari: 15.4,
      edge: 111,
    },
    fallback: 'HSL color values',
  },
  'var(--': {
    name: 'CSS Custom Properties',
    support: {
      chrome: 49,
      firefox: 31,
      safari: 9.1,
      edge: 16,
    },
    fallback: 'Static color values',
  },
  'clamp(': {
    name: 'CSS clamp() Function',
    support: {
      chrome: 79,
      firefox: 75,
      safari: 13.1,
      edge: 79,
    },
    fallback: 'Media queries for responsive sizing',
  },
  'display: grid': {
    name: 'CSS Grid Layout',
    support: {
      chrome: 57,
      firefox: 52,
      safari: 10.1,
      edge: 16,
    },
    fallback: 'Flexbox layouts',
  },
  ':focus-visible': {
    name: 'Focus Visible Pseudo-class',
    support: {
      chrome: 86,
      firefox: 85,
      safari: 15.4,
      edge: 86,
    },
    fallback: ':focus pseudo-class',
  },
  '@supports': {
    name: 'CSS Feature Queries',
    support: {
      chrome: 28,
      firefox: 22,
      safari: 9,
      edge: 12,
    },
    fallback: 'Progressive enhancement',
  },
  'prefers-reduced-motion': {
    name: 'Reduced Motion Media Query',
    support: {
      chrome: 74,
      firefox: 63,
      safari: 10.1,
      edge: 79,
    },
    fallback: 'Animation controls in UI',
  },
}

function analyzeCSSFile(filePath) {
  try {
    const cssContent = fs.readFileSync(filePath, 'utf8')
    const results = {
      file: path.relative(process.cwd(), filePath),
      features: [],
      issues: [],
      recommendations: [],
    }

    // Check for each CSS feature
    Object.entries(CSS_FEATURES).forEach(([pattern, info]) => {
      const regex = new RegExp(pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi')
      const matches = cssContent.match(regex)

      if (matches) {
        results.features.push({
          feature: info.name,
          pattern: pattern,
          occurrences: matches.length,
          support: info.support,
          fallback: info.fallback,
        })
      }
    })

    // Check for potential issues
    checkForIssues(cssContent, results)

    return results
  } catch (error) {
    return {
      file: filePath,
      error: error.message,
      features: [],
      issues: [],
      recommendations: [],
    }
  }
}

function checkForIssues(cssContent, results) {
  // Check for missing fallbacks
  if (cssContent.includes('oklch(') && !cssContent.includes('hsl(')) {
    results.issues.push({
      type: 'Missing Fallback',
      description: 'OKLCH colors found without HSL fallbacks',
      severity: 'medium',
      recommendation: 'Add HSL fallback values for older browsers',
    })
  }

  // Check for vendor prefixes
  const needsPrefixes = ['transform', 'transition', 'animation', 'box-shadow', 'border-radius']

  needsPrefixes.forEach((property) => {
    const regex = new RegExp(`\\b${property}\\s*:`, 'gi')
    if (cssContent.match(regex)) {
      const prefixRegex = new RegExp(`-webkit-${property}\\s*:`, 'gi')
      if (!cssContent.match(prefixRegex)) {
        results.recommendations.push({
          type: 'Vendor Prefix',
          description: `Consider adding -webkit- prefix for ${property}`,
          severity: 'low',
        })
      }
    }
  })

  // Check for modern CSS features without @supports
  if (cssContent.includes('oklch(') && !cssContent.includes('@supports (color: oklch(')) {
    results.recommendations.push({
      type: 'Feature Detection',
      description: 'Use @supports for OKLCH color detection',
      severity: 'medium',
    })
  }

  // Check for accessibility
  if (!cssContent.includes('prefers-reduced-motion')) {
    results.issues.push({
      type: 'Accessibility',
      description: 'No reduced motion preferences detected',
      severity: 'medium',
      recommendation: 'Add support for prefers-reduced-motion media query',
    })
  }
}

function generateReport(analysisResults) {
  const report = {
    timestamp: new Date().toISOString(),
    summary: {
      filesAnalyzed: analysisResults.length,
      totalFeatures: 0,
      totalIssues: 0,
      totalRecommendations: 0,
    },
    browserCompatibility: {},
    files: analysisResults,
  }

  // Calculate summary statistics
  analysisResults.forEach((result) => {
    if (result.features) {
      report.summary.totalFeatures += result.features.length
    }
    if (result.issues) {
      report.summary.totalIssues += result.issues.length
    }
    if (result.recommendations) {
      report.summary.totalRecommendations += result.recommendations.length
    }
  })

  // Generate browser compatibility matrix
  const browsers = ['chrome', 'firefox', 'safari', 'edge']
  browsers.forEach((browser) => {
    report.browserCompatibility[browser] = {
      supported: [],
      unsupported: [],
      partial: [],
    }
  })

  return report
}

function printReport(report) {
  console.log('🔍 CSS Cross-Browser Compatibility Analysis')
  console.log('==========================================\n')

  console.log(`📊 Summary:`)
  console.log(`   Files Analyzed: ${report.summary.filesAnalyzed}`)
  console.log(`   CSS Features Found: ${report.summary.totalFeatures}`)
  console.log(`   Issues Detected: ${report.summary.totalIssues}`)
  console.log(`   Recommendations: ${report.summary.totalRecommendations}\n`)

  report.files.forEach((file) => {
    if (file.error) {
      console.log(`❌ ${file.file}: ${file.error}\n`)
      return
    }

    console.log(`📄 ${file.file}`)
    console.log('─'.repeat(50))

    if (file.features.length > 0) {
      console.log('🎨 CSS Features Detected:')
      file.features.forEach((feature) => {
        console.log(`   • ${feature.feature} (${feature.occurrences} occurrences)`)
        console.log(
          `     Browser Support: Chrome ${feature.support.chrome}+, Firefox ${feature.support.firefox}+, Safari ${feature.support.safari}+, Edge ${feature.support.edge}+`,
        )
        console.log(`     Fallback: ${feature.fallback}`)
      })
      console.log('')
    }

    if (file.issues.length > 0) {
      console.log('⚠️  Issues:')
      file.issues.forEach((issue) => {
        const severity =
          issue.severity === 'high' ? '🔴' : issue.severity === 'medium' ? '🟡' : '🟢'
        console.log(`   ${severity} ${issue.type}: ${issue.description}`)
        if (issue.recommendation) {
          console.log(`     Recommendation: ${issue.recommendation}`)
        }
      })
      console.log('')
    }

    if (file.recommendations.length > 0) {
      console.log('💡 Recommendations:')
      file.recommendations.forEach((rec) => {
        const severity = rec.severity === 'high' ? '🔴' : rec.severity === 'medium' ? '🟡' : '🟢'
        console.log(`   ${severity} ${rec.type}: ${rec.description}`)
      })
      console.log('')
    }

    console.log('')
  })

  console.log('✅ Analysis Complete!')
  console.log('For detailed browser testing, see: tests/cross-browser/MANUAL_TESTING_GUIDE.md')
}

function main() {
  const cssFiles = ['src/app/(frontend)/[locale]/globals.css']

  const analysisResults = cssFiles.map((file) => {
    const fullPath = path.resolve(file)
    if (fs.existsSync(fullPath)) {
      return analyzeCSSFile(fullPath)
    } else {
      return {
        file: file,
        error: 'File not found',
        features: [],
        issues: [],
        recommendations: [],
      }
    }
  })

  const report = generateReport(analysisResults)

  // Save detailed report
  const reportPath = path.join(__dirname, 'css-compatibility-report.json')
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2))

  // Print summary
  printReport(report)

  console.log(`\n📋 Detailed report saved to: ${reportPath}`)
}

// Run if this is the main module
if (import.meta.url === `file://${process.argv[1]}`) {
  main()
}

export { analyzeCSSFile, generateReport, CSS_FEATURES }
