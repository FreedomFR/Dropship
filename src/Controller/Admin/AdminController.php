<?php

namespace App\Controller\Admin;

use App\Entity\Article;
use App\Repository\ArticleRepository;
use App\Repository\ImageRepository;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManager;
use Doctrine\Persistence\ManagerRegistry;
use Doctrine\Persistence\ManagerRegistry as PersistenceManagerRegistry;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class AdminController extends AbstractController
{
    /**
     * @var EntityManager
     */
    private $em;

    /**
     * @var UserRepository
     */
    private $userRepository;

    public function __construct(
        ManagerRegistry $doctrine,
        UserRepository $userRepository
    )
    {
        $this->em = $doctrine->getManager();
        $this->userRepository = $userRepository;
    }

    /**
     * @Route("/admin", name="admin_index")
     */
    public function index(): Response
    {
        return $this->render('admin/page/index.html.twig', [
        ]);
    }

    /**
     * @Route("/admin/users", name="admin_users")
     */
    public function users(UserRepository $userRepository): Response
    {
        $users = $userRepository->findAll();

        return $this->render('admin/page/users/index.html.twig', [
            'users' => $users
        ]);
    }

    /**
     * @Route("/admin/articles/list", name="admin_articles_list")
     */
    public function ArticlesList(ArticleRepository $articleRepository): Response
    {
        $articles = $articleRepository->findAll();

        return $this->render('admin/page/articles/list.html.twig', [
            'articles' => $articles
        ]);
    }

    /**
     * @Route("/admin/article/form/add", name="admin_article_form_add")
     */
    public function AticlesFormAdd(Request $request, ArticleRepository $articleRepository): Response
    {

        $req = $request->query;
        $article = new Article();

        if ($req->get('id'))
        {
            $article = $articleRepository->find($req->get('id'));
        }

        return $this->render('admin/page/articles/product-add.html.twig', [
            'article' => $article
        ]);
    }

    /**
     * @Route("/admin/article/form/save", name="admin_article_form_save")
     */
    public function AticlesFormSave(Request $request, ArticleRepository $articleRepository): Response
    {
        $req = $request->request;

        $id = $req->get('id');
        $nom = $req->get('nom');
        $description = $req->get('description');

        $article = new Article();
        if($id != "")
        {
            $article = $articleRepository->find($id);
        }

        $article->setNom($nom);
        $article->setDescription($description);

        $this->em->persist($article);
        $this->em->flush();

        return $this->redirectToRoute('admin_articles_list');
    }

    /**
     * @Route("/admin/article/form/image/add", name="admin_article_form_image_add")
     */
    public function AticlesFormImageAdd(Request $request, ArticleRepository $articleRepository, ImageRepository $imageRepository): Response
    {
        $req = $request->query;
        $id = "";


        $images = [];

        if($req->get('id') != "")
        {
            $id = $req->get('id');
            $images = $imageRepository->findBy(['article'=> $id]);
        }

        return $this->render('admin/page/articles/product-add-image.html.twig', [
            'images' => $images,
            'id' => $id
        ]);
    }

    /**
     * @Route("/admin/article/form/image/save", name="admin_article_form_image_save")
     */
    public function AticlesFormImageSave(Request $request, ArticleRepository $articleRepository, ImageRepository $imageRepository): Response
    {
        $req = $request->query;
    }

}
