#!/usr/bin/env python3
"""
Script para aplicar migrações SQL diretamente no Supabase
"""

import os
import sys
from supabase import create_client, Client

# Configurações do Supabase
SUPABASE_URL = "https://pkefwvvkydzzfstzwppv.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBrZWZ3dnZreWR6emZzdHp3cHB2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NzM0MjY3NSwiZXhwIjoyMDYyOTE4Njc1fQ.x9lc7-x9Aj0bB0WOZQ4b_buEwftPgCuGirvxjn_S6m8"

# Inicializar cliente Supabase
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

def execute_sql_file(file_path):
    """Executa um arquivo SQL no Supabase"""
    print(f"Executando arquivo: {file_path}")
    
    try:
        with open(file_path, 'r') as file:
            sql_content = file.read()
            
        # Dividir o conteúdo em comandos SQL individuais
        # Esta é uma abordagem simplificada, pode precisar de ajustes para scripts complexos
        sql_commands = sql_content.split(';')
        
        results = []
        for command in sql_commands:
            command = command.strip()
            if command:
                try:
                    # Executar o comando SQL via API REST do Supabase
                    result = supabase.rpc('exec_sql', {'query': command + ';'}).execute()
                    results.append(result)
                    print(f"Comando executado com sucesso: {command[:50]}...")
                except Exception as e:
                    print(f"Erro ao executar comando: {e}")
                    print(f"Comando com erro: {command}")
        
        return results
    
    except Exception as e:
        print(f"Erro ao processar arquivo {file_path}: {e}")
        return None

def main():
    """Função principal para aplicar migrações"""
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    migrations_dir = os.path.join(base_dir, 'supabase', 'migrations')
    
    if not os.path.exists(migrations_dir):
        print(f"Diretório de migrações não encontrado: {migrations_dir}")
        sys.exit(1)
    
    # Listar arquivos de migração em ordem
    migration_files = sorted([
        os.path.join(migrations_dir, f) 
        for f in os.listdir(migrations_dir) 
        if f.endswith('.sql')
    ])
    
    if not migration_files:
        print("Nenhum arquivo de migração encontrado.")
        sys.exit(1)
    
    print(f"Encontrados {len(migration_files)} arquivos de migração.")
    
    # Executar cada arquivo de migração
    for file_path in migration_files:
        print(f"\n{'='*50}")
        print(f"Aplicando migração: {os.path.basename(file_path)}")
        print(f"{'='*50}")
        
        result = execute_sql_file(file_path)
        
        if result is None:
            print(f"Falha ao aplicar migração: {file_path}")
            sys.exit(1)
    
    print("\nTodas as migrações foram aplicadas com sucesso!")

if __name__ == "__main__":
    main()
