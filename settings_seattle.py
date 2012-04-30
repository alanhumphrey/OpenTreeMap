import os
#import logging

#logging.basicConfig(
#    level = logging.DEBUG,
#    format = '%(asctime)s %(levelname)s %(message)s',
#)

GEOSERVER_URL = 'http://sasdev.dnsalias.org:8080/geoserver/wms?transparent=true'
TILECACHE_URL = 'http://tilecache.sasdev.dnsalias.org/tilecache.cgi?'
TILECACHE_LAYER = 'cc:neighborhood'
# TODO - figure this out - used in template_4.html
# must end with trees/ because of odd tilecache deployment issue
# will be populated with layer name /trees/{layername} dynamically
# in javascript depending on the google base layer being used
#TC_URL = 'http://tilecache.urbanforestmap.org/tiles/1.0.0/trees/'
TC_URL = 'http://tilecache.sasdev.dnsalias.org/tiles/1.0.0/trees/'
COPYRIGHT = '(c) Canopy Connections'

# directory name for this installation - used to build url to static data (css, js, images) 
SITE_LOCATION = 'seattle'

# TODO - figure out this flag
PENDING_ON = False

# name of the area of interest - used in an error message when user tries to go out of bounds
REGION_NAME = 'seattle'

# Your Google API Key
GOOGLE_API_KEY = 'abcdf'

# TODO - figure out how this is used in models.py/percent_complete
COMPLETE_ARRAY = ['species','condition','sidewalk_damage','powerline_conflict_potential','dbh','plot_width','plot_length','plot_type']
MAP_CLICK_RADIUS = .0015 # in decimal degrees
        
STATIC_DATA = os.path.join(os.path.dirname(__file__), 'static/')

# TODO - is this necessary?  Used in kml_output.kml
ROOT_URL = 'http://canopyconnections.org'

# if true, max tree for display is 0, otherwise 500
TILED_SEARCH_RESPONSE = False

# if true, show all species/neighborhoods in search dropdowns
# if false, show only species/neighborhoods with trees
SHOW_ALL_SEARCH = True

# settings for qs_tiles/views.py  - qs_tiles doesn't appear to be used.
# separate instance of tilecache for dynamic selection tiles
CACHE_SEARCH_TILES = True
CACHE_SEARCH_METHOD = 'disk' #'disk'
CACHE_SEARCH_DISK_PATH = os.path.join(os.path.dirname(__file__), 'local_tiles/')
MAPNIK_STYLESHEET = os.path.join(os.path.dirname(__file__), 'mapserver/stylesheet.xml')

# TODO - how does sorl fit in?
# sorl thumbnail settings
THUMBNAIL_DEBUG = True
THUMBNAIL_SUBDIR = '_thumbs'
#THUMBNAIL_EXTENSION = 'png'
#THUMBNAIL_QUALITY = 95 # if not using png

# django-registration
REGISTRATION_OPEN = True # defaults to True
ACCOUNT_ACTIVATION_DAYS = 5

# TODO - used?
DEFAULT_FROM_EMAIL= 'contact@canopyconnections.org'
EMAIL_MANAGERS = False

#http://sftrees.securemaps.com/ticket/236
CONTACT_EMAILS = ['alan.humphrey@comcast.net']#,'admins@urbanforestmap.org']

CACHE_BACKEND = 'file:///tmp/trees_cache'

DATABASES = {
    'default': {
        'NAME': 'trees',
        'ENGINE': 'django.contrib.gis.db.backends.postgis',
        'USER': 'tree_login',
        'PASSWORD': 'sas_tree_login',
        'HOST': '192.168.1.100',
        'PORT': '5433',
    }
}

# URL prefix for admin media -- CSS, JavaScript and images. Make sure to use a
# trailing slash.
# Examples: "http://foo.com/media/", "/media/".
ADMIN_MEDIA_PREFIX = '/admin_media/' # TODO not used?
ADMIN_MEDIA_ROOT = os.path.join(os.path.dirname(__file__), 'admin_media/')

# django settings

# Absolute path to the directory that holds media.
# Example: "/home/media/media.lawrence.com/"
MEDIA_ROOT = os.path.join(os.path.dirname(__file__), 'media/')

# TODO - confirm this is working in tree_detail.html and tree_edit.html
# URL that handles the media served from MEDIA_ROOT. Make sure to use a
# trailing slash if there is a path component (optional in other cases).
# Examples: "http://media.lawrence.com", "http://example.com/media/"
MEDIA_URL = ''

ADMINS = (
    ('Admin1', 'alan.humphrey@comcast.net'),
)

MANAGERS = ADMINS

# Local time zone for this installation. Choices can be found here:
# http://en.wikipedia.org/wiki/List_of_tz_zones_by_name
# although not all choices may be available on all operating systems.
# If running in a Windows environment this must be set to the same as your
# system time zone.
TIME_ZONE = 'America/Vancouver'

SITE_ID = 1

# Make this unique, and don't share it with anybody.
SECRET_KEY = 'insecure'

TEMPLATE_DIRS = (
    os.path.join(os.path.dirname(__file__), 'templates/seattle'),
    os.path.join(os.path.dirname(__file__), 'templates'),
)


