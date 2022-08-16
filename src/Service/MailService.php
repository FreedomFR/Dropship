<?php
namespace App\Service;

use App\Entity\User;
use Swift_Mailer;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Twig\Environment;

class MailService
{

    private $mailer;
    private $twig;

    function __construct(Swift_Mailer $mailer, Environment $twig)
    {
        $this->mailer = $mailer;  
        $this->twig = $twig;  
    }

    public function send(string $email, $emailArray)
    {
        $message = (new \Swift_Message($emailArray['titre']))
            ->setFrom('noreply@depannagescooter.fr')
            ->setTo($email)
            ->setBody(
                $this->twig->render(
                    'mail/messageVisiteur.html.twig',
                    [
                        'objet' => $emailArray["objet"],
                        'message' => $emailArray["message"],
                        'telephone' => $emailArray["telephone"],
                        'email' => $emailArray["email"],
                        'fullName' => $emailArray["fullName"],
                    ]
                ),
                'text/html'
            );
        
        try {
            $this->mailer->send($message);
        } catch (\Throwable $th){
            // dump($th);
            // die();
        }
    }


    public function sendDevis(string $email, $emailArray)
    {
        $message = (new \Swift_Message($emailArray['titre']))
            ->setFrom('noreply@depannagescooter.fr')
            ->setTo($email)
            ->setBody(
                $this->twig->render(
                    'mail/messageDevis.html.twig',
                    [
                        'adresseRecup' => $emailArray["adresseRecup"],
                        'adresseDepo' => $emailArray["adresseDepo"],
                        'telephone' => $emailArray["telephone"],
                        'date' => $emailArray["date"],
                        'fullName' => $emailArray["fullName"],
                        'typeIntervention' => $emailArray["typeIntervention"],
                    ]
                ),
                'text/html'
            );

        try {
            $this->mailer->send($message);
        } catch (\Throwable $th){
            // dump($th);
            // die();
        }
    }

}