#!/usr/bin/python

import httplib, urllib, sys, json, time;

OUTPUT_PATH = './embed.min.js';
SOURCE_PATH = './embed.js';

def compilePath(path):
    f = open(path, 'r');

    params = urllib.urlencode([
        ('js_code', f.read()),
        ('compilation_level', 'ADVANCED_OPTIMIZATIONS'),
        ('output_format', 'json'),
        ('warning_level', 'VERBOSE'),
        # ('language', 'ECMASCRIPT5_STRICT'),
        ('output_info', 'compiled_code')
    ]);

    f.close();

    headers = { "Content-type": "application/x-www-form-urlencoded" };
    conn = httplib.HTTPConnection('closure-compiler.appspot.com');
    conn.request('POST', '/compile', params, headers);
    response = conn.getresponse();

    data = json.loads(response.read());

    conn.close();

    if 'compiledCode' not in data:
        print 'Invalid response.';
        return None;

    return data['compiledCode'];


sys.stdout.write('Compiling... ');
sys.stdout.flush();

start = time.time();
data = compilePath(SOURCE_PATH);
end = time.time();

delta = end - start;

sys.stdout.write('done in ' + str(delta) + ' seconds \n');

if data is not None:
    dest = open(OUTPUT_PATH, 'w');
    dest.write(data);
    dest.close();
else:
    print 'Error. No file written.';
    sys.exit(1);

