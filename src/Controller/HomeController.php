<?php
namespace App\Controller;

use App\Repository\ArticleRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class HomeController extends AbstractController
{
    /**
     * @Route("/", name="home")
     */
    public function index(): Response
    {
        return $this->render('page/home/index.html.twig', []);
    }

    /**
     * @Route("/product/list", name="product_list")
     */
    public function productList(ArticleRepository $articleRepository): Response
    {
        $articles = $articleRepository->findAll();
        return $this->render('page/home/product/product-list.html.twig', [
            'articles' => $articles
        ]);
    }

    /**
     * @Route("/product/show/{id}", name="product_show")
     */
    public function productShow($id, ArticleRepository $articleRepository): Response
    {
        $article = $articleRepository->find($id);
        return $this->render('page/home/product/product-show.html.twig', [
            'article' => $article
            ]
        );
    }

}