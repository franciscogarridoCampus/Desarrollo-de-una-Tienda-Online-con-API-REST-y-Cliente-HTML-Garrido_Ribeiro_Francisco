<?php
header('Content-Type: application/json');
$TOKEN = "MI_TOKEN_SECRETO";

$input = json_decode(file_get_contents('php://input'), true);
$token = $input['token'] ?? '';
$productos_vistos = $input['productos_vistos'] ?? [];

if($token !== $TOKEN){
    echo json_encode(["success" => false, "message" => "Token inválido"]);
    exit;
}

// En este ejemplo no se almacena en el servidor, solo confirma recepción
echo json_encode(["success" => true, "message" => "Productos vistos actualizados"]);
?>
