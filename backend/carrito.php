<?php
header('Content-Type: application/json');
$TOKEN = "MI_TOKEN_SECRETO";

$input = json_decode(file_get_contents('php://input'), true);
$token = $input['token'] ?? '';
$carrito = $input['carrito'] ?? [];

if($token !== $TOKEN){
    echo json_encode(["success" => false, "message" => "Token inválido"]);
    exit;
}

$tienda = json_decode(file_get_contents('tienda.json'), true);
$productos_validos = array_column($tienda['productos'], null, 'id');

$valido = true;
foreach($carrito as $item){
    $id = $item['id'];
    $precio = $item['precio'];
    if(!isset($productos_validos[$id]) || $productos_validos[$id]['precio'] != $precio){
        $valido = false;
        break;
    }
}

if($valido){
    echo json_encode(["success" => true, "message" => "Compra validada correctamente"]);
} else {
    echo json_encode(["success" => false, "message" => "Precio manipulado o producto no válido"]);
}
?>
