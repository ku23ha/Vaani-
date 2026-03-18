# Case Study System Documentation

## Overview

This system provides a flexible, reusable architecture for creating detailed case study pages that replicate the structure and formatting of professional PDF case studies. The system is designed to be data-driven, allowing new case studies to be added by simply creating a data file without modifying components.

## Architecture

### Components

1. **`CaseStudy.jsx`** - Main reusable component for rendering case studies
2. **`CaseStudyCard.jsx`** - Card component for case study previews (updated to support internal links)
3. **Data Files** - JSON-like data structures containing case study content

### Pages

- **`/case-studies/sandlogic-hindi-asr.js`** - Dedicated page for SandLogic case study
- **`/case-studies/index.js`** - Main case studies listing page

## Data Structure Schema

```javascript
{
  metadata: {
    id: "string",              // Unique identifier for routing
    companyName: "string",     // Company name
    companyLogo: "string",     // Path to company logo
    date: "string",            // Publication date
    readTime: "string"         // Estimated read time
  },
  
  header: {
    mainTitle: "string",       // Main case study title
    subtitle: "string",        // Subtitle/tagline
    heroImage: "string"        // Optional hero image
  },
  
  sections: [
    {
      id: "string",            // Section identifier
      title: "string",         // Section title
      type: "text | mixed",    // Content type
      content: [               // Array of content blocks
        {
          type: "paragraph | bullets | table | subheading",
          // Type-specific properties...
        }
      ],
      subsections: [           // Optional subsections
        {
          id: "string",
          title: "string", 
          content: [...]
        }
      ]
    }
  ]
}
```

## Content Block Types

### 1. Paragraph Block
```javascript
{
  type: "paragraph",
  text: "Text content with **bold** formatting support"
}
```

### 2. Bullets Block
```javascript
{
  type: "bullets",
  items: [
    "**Bold text**: Regular text",
    "Another bullet point"
  ]
}
```

### 3. Subheading Block
```javascript
{
  type: "subheading",
  text: "Subheading Text"
}
```

### 4. Table Block
```javascript
{
  type: "table",
  title: "Optional table title",
  headers: ["Column 1", "Column 2", "Column 3"],
  rows: [
    ["Data 1", "Data 2", "Data 3"],
    ["Data 4", "Data 5", "Data 6"]
  ],
  highlight: ["~21%", "~55%"]  // Values to highlight in blue
}
```

## Features

### Professional Styling
- **Typography**: Clean, readable fonts with proper hierarchy
- **Tables**: Professional styling with alternating row colors, hover effects, and highlighted metrics
- **Responsive Design**: Mobile-first approach with responsive layouts
- **Visual Hierarchy**: Clear section breaks, numbered subsections, and consistent spacing

### SEO Optimization
- **Meta Tags**: Comprehensive meta tags for search engines
- **Open Graph**: Social media sharing optimization
- **Structured Data**: JSON-LD structured data for rich snippets
- **Semantic HTML**: Proper heading hierarchy and semantic elements

### Performance
- **Code Splitting**: Page-level code splitting for optimal loading
- **Image Optimization**: Next.js Image component for optimized images
- **Lazy Loading**: Content loads efficiently

## Adding New Case Studies

### Step 1: Create Data File
Create a new file in `/src/data/` following the schema:

```javascript
// /src/data/newCompanyCaseStudy.js
export const newCompanyCaseStudyData = {
  metadata: {
    id: "new-company-case-study",
    companyName: "New Company",
    companyLogo: "/logos/new-company.png",
    date: "2024",
    readTime: "6 min read"
  },
  header: {
    mainTitle: "Your Case Study Title",
    subtitle: "Your Subtitle"
  },
  sections: [
    // ... your sections
  ]
};
```

### Step 2: Create Page
Create a new page in `/pages/case-studies/`:

```javascript
// /pages/case-studies/new-company-case-study.js
import { CaseStudy } from '../../components/CaseStudy';
import { newCompanyCaseStudyData } from '../../src/data/newCompanyCaseStudy';

export default function NewCompanyCaseStudyPage() {
  return <CaseStudy caseStudyData={newCompanyCaseStudyData} />;
}
```

### Step 3: Update Case Study Card
Add the new case study to `/components/caseStudiesData.js`:

```javascript
{
  id: 2,
  title: "Your Case Study Title",
  companyName: "New Company",
  companyLogo: "/logos/new-company.png",
  problemStatement: "Brief problem description...",
  solution: "Brief solution description...",
  outcome: "Brief outcome description...",
  businessImpact: "Brief business impact...",
  readMoreLink: "/case-studies/new-company-case-study"
}
```

## Styling Guidelines

### Colors
- **Primary Blue**: `#2563eb` (blue-600)
- **Text**: `#334155` (slate-700) for body, `#0f172a` (slate-900) for headings
- **Backgrounds**: `#f8fafc` (slate-50) for page, `#ffffff` for cards
- **Highlights**: `#dbeafe` (blue-100) for highlighted table cells

### Typography
- **Headings**: Bold, clear hierarchy (text-4xl, text-2xl, text-xl, text-lg)
- **Body**: `text-base` (16px) with `leading-relaxed` (1.625)
- **Tables**: `text-sm` (14px) for better data density

### Spacing
- **Sections**: `mb-12` (48px) between major sections
- **Content**: `mb-4` to `mb-6` between content blocks
- **Tables**: `my-8` (32px) for visual separation

## Best Practices

### Content Structure
1. **Start with Summary** - Always begin with a clear summary section
2. **Logical Flow** - Structure sections to tell a story (Challenge → Solution → Results → Impact)
3. **Data-Driven** - Include quantifiable metrics and results
4. **Visual Breaks** - Use tables, bullets, and subheadings to break up text

### Performance
1. **Optimize Images** - Use WebP format and appropriate sizes
2. **Lazy Loading** - Implement for images and heavy content
3. **Code Splitting** - Keep page bundles small

### SEO
1. **Descriptive URLs** - Use clear, keyword-rich URLs
2. **Meta Descriptions** - Write compelling meta descriptions
3. **Internal Linking** - Link between related case studies
4. **Schema Markup** - Include structured data for rich snippets

## Example Implementation

The SandLogic case study demonstrates all features:
- **URL**: `/case-studies/sandlogic-hindi-asr`
- **Data**: `/src/data/sandlogicCaseStudyData.js`
- **Page**: `/pages/case-studies/sandlogic-hindi-asr.js`

This implementation includes:
- 7 main sections with hierarchical structure
- 2 data tables with highlighted metrics
- Professional styling and responsive design
- Complete SEO optimization
- Structured data for search engines

## Future Enhancements

1. **Dynamic Routing** - Generate pages from data files automatically
2. **CMS Integration** - Connect to headless CMS for content management
3. **Analytics** - Track engagement and reading patterns
4. **Interactive Elements** - Add charts, graphs, and interactive data visualizations
5. **PDF Export** - Generate PDF versions of case studies
6. **Multi-language Support** - Internationalization for global reach
