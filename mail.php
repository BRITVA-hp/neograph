<?php
// Подключение библиотеки
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';

// Получение данных
$json = file_get_contents('php://input'); // Получение json строки
$data = json_decode($json, true); // Преобразование json

// Данные
$session = $data['session'];
$name = $data['name'];
$surname = $data['$surname'];
$contact = $data['contact'];
$contact_msg = $data['contact_msg'];

// Контент письма
$title = 'Заявка с сайта neograph'; // Название письма
$body = '<p>Имя: <strong>'.$name.'</strong></p>'.
        '<p>Фамилия: <strong>'.$surname.'</strong></p>'.
        '<p>Сессия: <strong>'.$session.'</strong></p>'.
        '<p>Контакт: <strong>'.$contact.'</strong></p>'.
        '<p>Мессенджер: <strong>'.$contact_msg.'</strong></p>';

// Настройки PHPMailer
$mail = new PHPMailer\PHPMailer\PHPMailer();

try {
  $mail->isSMTP();
  $mail->CharSet = 'UTF-8';
  $mail->SMTPAuth   = true;

  // Настройки почты отправителя
  $mail->Host       = 'smtp.mail.ru'; // SMTP сервера вашей почты
  $mail->Username   = 'britva_hp1989@mail.ru'; // Логин на почте
  $mail->Password   = 'hYi7uCcycHntMvD6vYSt'; // Пароль на почте
  $mail->SMTPSecure = 'ssl';
  $mail->Port       = 465;

  $mail->setFrom('britva_hp1989@mail.ru', 'Заявка с сайта neograph'); // Адрес самой почты и имя отправителя

  // Получатель письма
  $mail->addAddress('zamein@yandex.ru');

  // Отправка сообщения
  $mail->isHTML(true);
  $mail->Subject = $title;
  $mail->Body = $body;

  $mail->send('d');

  // Сообщение об успешной отправке
  echo ('Сообщение отправлено успешно!');

} catch (Exception $e) {
  header('HTTP/1.1 400 Bad Request');
  echo('Сообщение не было отправлено! Причина ошибки: {$mail->ErrorInfo}');
}
