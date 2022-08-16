<?php
namespace App\Controller;

use App\Repository\AnnonceRepository;
use App\Repository\CommuneRepository;
use App\Repository\PageRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class RobotsController extends AbstractController
{
    /**
     * @Route("/robots.txt", name="robots", defaults={"_format"="txt"})
     */
    public function robots(Request $request)
    {
        $hostname = $request->getSchemeAndHttpHost();
        $response = new Response(
            $this->renderView('sitemap/robots.html.twig', [
                'hostname' => $hostname
            ]),
            200
        );
        // Ajout des entêtes
        $response->headers->set('Content-Type', 'text/txt');
        // On envoie la réponse
        return $response;
    }

    /**
     * @Route("/sitemap.xml", name="sitemap", defaults={"_format"="xml"})
     */
    public function sitemap(Request $request, PageRepository $pageRepository)
    {
        // Nous récupérons le nom d'hôte depuis l'URL
        $hostname = $request->getSchemeAndHttpHost();
        $pages = $pageRepository->findBy(["reference" => true, "isBlog" => false]);

        // On initialise un tableau pour lister les URLs
        $urls = [];

        // On ajoute les URLs "statiques"
        foreach ($pages as $key => $page) {
            $images = [];
            if ($page->getImageBlog() != "") {
                $images = [
                    'loc' => '/assets/images/'.$page->getImageBlog(),
                    'title' => $page->getMETATitle()    // Optional, text describing the image
                ];
            }
            $urls[] = ['loc' => $this->generateUrl('page', array('url' => $page->getUrl())), 'lastmod' => $page->getDate(), 'image' => $images];
        }

        $pages = $pageRepository->findBy(["private" => false, "isBlog" => true]);

        // On ajoute les URLs Blog
        foreach ($pages as $key => $page) {
            $images = [];
            if ($page->getImageBlog() != "") {
                $images = [
                    'loc' => '/assets/images/'.$page->getImageBlog(),
                    'title' => $page->getMETATitle()    // Optional, text describing the image
                ];
            }
            $urls[] = ['loc' => $this->generateUrl('page', array('url' => $page->getUrl())), 'lastmod' => $page->getDate(), 'image' => $images];
        }



        $urls[] = ['loc' => $this->generateUrl('home')];
        $urls[] = ['loc' => $this->generateUrl('contact')];
        $urls[] = ['loc' => $this->generateUrl('blog')];
        $urls[] = ['loc' => $this->generateUrl('services')];
        $urls[] = ['loc' => $this->generateUrl('remorquage')];

        // Fabrication de la réponse XML
        $response = new Response(
            $this->renderView('sitemap/index.html.twig', ['urls' => $urls,
        'hostname' => $hostname]),
            200
        );

        // Ajout des entêtes
        $response->headers->set('Content-Type', 'text/xml');

        // On envoie la réponse
        return $response;
    }
}