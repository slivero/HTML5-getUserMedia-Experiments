<?php

$data = $_POST['img'];
//removing the "data:image/png;base64," part
$uri = substr($data, strpos($data, ",") + 1);
// put the data to a file
file_put_contents('wow.png', base64_decode($uri));

?>