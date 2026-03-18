// Case Study Content Parser
// Converts raw text content into structured data format

export function parseCaseStudyContent(rawContent, companyName, companyLogo = null) {
  // Split content by numbered sections
  const sections = rawContent.split(/^\d+\.\s+/m).filter(section => section.trim());
  
  const parsedSections = sections.map((sectionText, index) => {
    const lines = sectionText.trim().split('\n').filter(line => line.trim());
    const title = lines[0].trim();
    const contentLines = lines.slice(1);
    
    return parseSection(title, contentLines, index);
  });

  return {
    metadata: {
      id: companyName.toLowerCase().replace(/\s+/g, '-'),
      companyName: companyName,
      companyLogo: companyLogo,
      date: new Date().getFullYear().toString(),
      readTime: `${Math.ceil(rawContent.length / 1000)} min read`
    },
    
    header: {
      mainTitle: extractMainTitle(parsedSections[0]),
      subtitle: "Leveraging Vaani Dataset",
      heroImage: null
    },

    sections: parsedSections
  };
}

function extractMainTitle(firstSection) {
  // Extract a meaningful title from the summary section
  const summaryText = firstSection.content[0]?.text || '';
  
  // Look for patterns that suggest the main focus
  if (summaryText.includes('ASR') || summaryText.includes('speech recognition')) {
    return 'Advanced Speech Recognition Solutions';
  }
  if (summaryText.includes('call analytics')) {
    return 'Transforming Call Analytics with AI';
  }
  if (summaryText.includes('customer')) {
    return 'Enhancing Customer Experience with AI';
  }
  
  return 'AI-Powered Business Transformation';
}

function parseSection(title, contentLines, sectionIndex) {
  const sectionId = title.toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, '-')
    .substring(0, 50);

  const content = [];
  const subsections = [];
  
  let currentContent = [];
  let currentSubsection = null;
  
  for (let i = 0; i < contentLines.length; i++) {
    const line = contentLines[i].trim();
    
    if (!line) continue;
    
    // Check for subsection headers (A., B., C. etc.)
    const subsectionMatch = line.match(/^([A-Z])\.\s+(.+)$/);
    if (subsectionMatch) {
      // Save current content to main section
      if (currentContent.length > 0) {
        content.push(...parseContentBlocks(currentContent));
        currentContent = [];
      }
      
      // Save previous subsection
      if (currentSubsection) {
        subsections.push(currentSubsection);
      }
      
      // Start new subsection
      currentSubsection = {
        id: subsectionMatch[2].toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, '-'),
        title: subsectionMatch[2],
        content: []
      };
      continue;
    }
    
    // Add line to current content
    if (currentSubsection) {
      // We're in a subsection
      if (!currentSubsection.contentLines) currentSubsection.contentLines = [];
      currentSubsection.contentLines.push(line);
    } else {
      // We're in main section
      currentContent.push(line);
    }
  }
  
  // Process remaining content
  if (currentContent.length > 0) {
    content.push(...parseContentBlocks(currentContent));
  }
  
  // Process final subsection
  if (currentSubsection) {
    if (currentSubsection.contentLines) {
      currentSubsection.content = parseContentBlocks(currentSubsection.contentLines);
      delete currentSubsection.contentLines;
    }
    subsections.push(currentSubsection);
  }

  const section = {
    id: sectionId,
    title: title,
    type: subsections.length > 0 ? 'mixed' : 'text',
    content: content
  };

  if (subsections.length > 0) {
    section.subsections = subsections;
  }

  return section;
}

function parseContentBlocks(lines) {
  const blocks = [];
  let currentParagraph = [];
  let currentBullets = [];
  let currentTable = null;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    if (!line) {
      // Empty line - finish current block
      finishCurrentBlock();
      continue;
    }
    
    // Check for bullet points
    if (line.match(/^[•·-]\s+/) || line.match(/^\s*•\s+/)) {
      finishCurrentBlock();
      const bulletText = line.replace(/^[•·-]\s+/, '').replace(/^\s*•\s+/, '');
      currentBullets.push(bulletText);
      continue;
    }
    
    // Check for table headers (lines with multiple columns separated by spaces/tabs)
    if (isTableHeader(line, lines[i + 1])) {
      finishCurrentBlock();
      currentTable = parseTable(lines, i);
      blocks.push({
        type: 'table',
        headers: currentTable.headers,
        rows: currentTable.rows,
        highlight: extractHighlights(currentTable.rows)
      });
      i = currentTable.endIndex;
      currentTable = null;
      continue;
    }
    
    // Regular paragraph line
    finishCurrentBlock();
    currentParagraph.push(line);
  }
  
  // Finish any remaining blocks
  finishCurrentBlock();
  
  function finishCurrentBlock() {
    if (currentParagraph.length > 0) {
      blocks.push({
        type: 'paragraph',
        text: currentParagraph.join(' ')
      });
      currentParagraph = [];
    }
    
    if (currentBullets.length > 0) {
      blocks.push({
        type: 'bullets',
        items: currentBullets
      });
      currentBullets = [];
    }
  }
  
  return blocks;
}

function isTableHeader(line, nextLine) {
  // Simple heuristic: if line has multiple words and next line exists
  const words = line.split(/\s+/).filter(w => w.length > 0);
  return words.length >= 2 && nextLine && nextLine.trim();
}

function parseTable(lines, startIndex) {
  const headers = [];
  const rows = [];
  let i = startIndex;
  
  // Parse headers
  const headerLine = lines[i].trim();
  const headerParts = headerLine.split(/\s{2,}|\t+/); // Split by multiple spaces or tabs
  headers.push(...headerParts.map(h => h.trim()).filter(h => h));
  
  i++;
  
  // Parse rows
  while (i < lines.length) {
    const line = lines[i].trim();
    if (!line) break;
    
    // Check if this looks like a table row
    const parts = line.split(/\s{2,}|\t+/);
    if (parts.length >= 2) {
      rows.push(parts.map(p => p.trim()).filter(p => p));
      i++;
    } else {
      break;
    }
  }
  
  return {
    headers,
    rows,
    endIndex: i - 1
  };
}

function extractHighlights(rows) {
  const highlights = [];
  
  rows.forEach(row => {
    row.forEach(cell => {
      // Look for percentages with ~ symbol
      const percentageMatch = cell.match(/~\d+%/g);
      if (percentageMatch) {
        highlights.push(...percentageMatch);
      }
    });
  });
  
  return highlights;
}

// Helper function to generate case study data from raw content
export function generateCaseStudyData(rawContent, companyName, companyLogo = null) {
  return parseCaseStudyContent(rawContent, companyName, companyLogo);
}
