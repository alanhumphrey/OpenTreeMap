import os, sys

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "../")))
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "")))

os.environ['DJANGO_SETTINGS_MODULE'] = 'canopyconnections.settings'

import django.core.handlers.wsgi

application = django.core.handlers.wsgi.WSGIHandler()
