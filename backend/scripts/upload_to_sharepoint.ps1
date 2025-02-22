# Configuración
$sharepointUrl = $env:SHAREPOINT_URL
$username = $env:SHAREPOINT_USER
$password = $env:SHAREPOINT_PASS
$listName = $env:SHAREPOINT_LIST
$filePath = ".\temp\form_data.json"

# Convertir la contraseña a SecureString
$securePassword = ConvertTo-SecureString $password -AsPlainText -Force

# Crear credenciales
$credentials = New-Object -TypeName System.Management.Automation.PSCredential -ArgumentList $username, $securePassword

# Conectar a SharePoint
Connect-PnPOnline -Url $sharepointUrl -Credentials $credentials

# Leer los datos del formulario
$formData = Get-Content -Path $filePath -Raw | ConvertFrom-Json

# Añadir los datos a la lista de SharePoint
Add-PnPListItem -List $listName -Values @{
    "Title" = $formData.title;
    "Description" = $formData.description;
    # Añadir más campos según la lista de SharePoint
}

Write-Output "Datos subidos correctamente a SharePoint."