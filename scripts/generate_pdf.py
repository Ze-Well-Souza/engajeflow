#!/usr/bin/env python3

import os
from weasyprint import HTML, CSS

# Diretórios
docs_dir = '/home/ubuntu/projects/techcare-connect-automator/docs'
html_file = os.path.join(docs_dir, 'ebook_salao_beleza.html')
css_file = os.path.join(docs_dir, 'ebook_styles.css')
output_file = os.path.join(docs_dir, 'TechCare_Connect_Guia_Salao_Beleza.pdf')

# Carregar CSS
css = CSS(filename=css_file)

# Converter HTML para PDF
HTML(filename=html_file).write_pdf(
    output_file,
    stylesheets=[css],
    presentational_hints=True
)

print(f"PDF gerado com sucesso: {output_file}")
