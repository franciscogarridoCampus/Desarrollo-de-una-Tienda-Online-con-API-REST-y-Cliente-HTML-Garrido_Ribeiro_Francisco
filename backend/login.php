<?php
header('Content-Type: application/json');
$TOKEN = "MI_TOKEN_SECRETO";

$input = json_decode(file_get_contents('php://input'), true);
$username = $input['username'] ?? '';
$password = $input['password'] ?? '';

$usuarios = json_decode(file_get_contents('usuarios.json'), true);
$usuario_valido = false;

foreach($usuarios as $user){
    if($user['username'] === $username && $user['password'] === $password){
        $usuario_valido = true;
        break;
    }
}

if($usuario_valido){
    $tienda = json_decode(file_get_contents('tienda.json'), true);
    echo json_encode([
        "success" => true,
        "token" => $TOKEN,
        "tienda" => $tienda
    ]);
} else {
    echo json_encode(["success" => false, "message" => "Usuario o contraseña incorrectos"]);
}
?>
