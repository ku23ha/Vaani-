import os

with open('components/Faqs.jsx', 'r') as f:
    lines = f.readlines()

for i, line in enumerate(lines):
    if "don't" in line:
        lines[i] = line.replace("don't", "don&apos;t")
    if "won't" in line:
        lines[i] = line.replace("won't", "won&apos;t")
    if "can't" in line:
        lines[i] = line.replace("can't", "can&apos;t")

with open('components/Faqs.jsx', 'w') as f:
    f.writelines(lines)
