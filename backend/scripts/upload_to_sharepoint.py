import os
import json
from shareplum import Site, Office365
from shareplum.list import List

# Configuración
SHAREPOINT_URL = os.getenv('SHAREPOINT_URL')
SHAREPOINT_USER = os.getenv('SHAREPOINT_USER')
SHAREPOINT_PASS = os.getenv('SHAREPOINT_PASS')
SHAREPOINT_LIST = os.getenv('SHAREPOINT_LIST')

# Leer los datos del formulario
with open('temp/form_data.json', 'r') as file:
    form_data = json.load(file)

# Autenticación en SharePoint
authcookie = Office365(SHAREPOINT_URL, username=SHAREPOINT_USER, password=SHAREPOINT_PASS).GetCookies()
site = Site(SHAREPOINT_URL, authcookie=authcookie)

# Subir datos a la lista de SharePoint
sp_list = site.List(SHAREPOINT_LIST)
sp_list.AddItem({
    'Title': form_data['nombre'],
    'Description': form_data['descripcion']
})

# Subir el archivo adjunto
with open(form_data['archivo']['path'], 'rb') as file:
    site.Folder('Documentos').upload_file(file, form_data['archivo']['originalname'])

print("Datos subidos correctamente a SharePoint.")