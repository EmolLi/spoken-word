import os, json, glob, sys

find_missing_icons = sys.argv[-1] == '-f'


def is_extension_valid(icon_file):
    return icon_file.endswith('.png') or icon_file.endswith('.svg') or icon_file.endswith('.xpm')

apps_dir = '/usr/share/applications/'
icon_dirs = ['{}/.icons'.format(os.environ['HOME'])]
icon_dirs.extend([('{}icons' if i.endswith('/') else '{}/icons').format(i)
                  for i in os.environ['XDG_DATA_DIRS'].split(':')])
icon_dirs.append('/usr/share/pixmaps')

appdata = {}

for program in os.listdir(apps_dir):
    if program.endswith('.desktop'):
        for line in open(apps_dir + program).readlines():
            end = line.find('%' or '\n')
            if line.startswith('Name='):
                name = line[5:end]
            elif line.startswith('Icon='):
                icon = line[5:end]

                if find_missing_icons and (not icon or not is_extension_valid(icon)):
                    locs = []
                    for idir in icon_dirs:
                        locs.extend(glob.glob(pathname='{}/**/{}.*'.format(idir, icon or name),
                                    recursive=True))
                    icon = next((i for i in locs if is_extension_valid(i)), None)
            elif line.startswith('Exec='):
                exc = line[5:end]

        appdata[name] = {'icon': icon, 'command': exc}

json.dump(appdata, open('appdata.json', 'w'), indent=4)

