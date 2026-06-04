from pathlib import Path
text = Path('src/dataQ/systemDesign_questions.js').read_text(encoding='utf-8')
ids = [
    'arch_1','arch_2','arch_3','arch_4','arch_5','arch_6',
    'uml_1','uml_2','uml_3','uml_4','uml_5','uml_6',
    'req_1','req_2','req_3','req_4','req_5','req_6',
    'meth_1','meth_2','meth_3','meth_4','meth_5','meth_6'
]
print('Summary:')
print('ID | learningType | difficulty')
for idv in ids:
    start = text.find(f'id: "{idv}"')
    if start == -1:
        print(f'{idv} | MISSING')
        continue
    end = text.find('},', start)
    snippet = text[start:end]
    lt = 'unknown'
    diff = 'unknown'
    for line in snippet.splitlines():
        line = line.strip()
        if line.startswith('learningType:'):
            lt = line.split(':',1)[1].strip().strip('"')
        if line.startswith('difficulty:'):
            diff = line.split(':',1)[1].strip().strip(',')
    print(f'{idv} | {lt} | {diff}')

print('\nVerification:')
for idv in ids:
    cnt = text.count(f'id: "{idv}"')
    print(f'{idv}: {cnt}')
