import os, re, json

apps_dir = '/usr/share/applications/'
appdata = {}

for program in os.listdir(apps_dir):
    if program.endswith('.desktop'):
        for line in open(apps_dir + program).readlines():
            if line.startswith('Name='):
                end = line.find('%' or '\n')
                name = line[5:end]
            elif line.startswith('Icon='):
                end = line.find('%' or '\n')
                icon = line[5:end]
            elif line.startswith('Exec='):
                end = line.find('%' or '\n')
                exc = line[5:end]

        appdata[name] = {'icon': icon, 'command': exc}

json.dump(appdata, open('appdata.json', 'w'))

