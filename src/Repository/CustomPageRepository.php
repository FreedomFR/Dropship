<?php

namespace App\Repository;

use App\Entity\CustomPage;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<CustomPage>
 *
 * @method CustomPage|null find($id, $lockMode = null, $lockVersion = null)
 * @method CustomPage|null findOneBy(array $criteria, array $orderBy = null)
 * @method CustomPage[]    findAll()
 * @method CustomPage[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class CustomPageRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, CustomPage::class);
    }

    public function add(CustomPage $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(CustomPage $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function findOneByTitleSlug($titleSlug): ?CustomPage
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.titleSlug = :titleSlug')
            ->setParameter('titleSlug', $titleSlug)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }

    public function findAllVisibleArticles()
    {
        return $this->createQueryBuilder('p')
        ->where('p.isBlog = 1')
        ->andWhere('p.isPrivate = 0')
        ->orderBy('p.updatedAt', 'DESC')
        ->getQuery()
        ->getResult();
    }

//    /**
//     * @return CustomPage[] Returns an array of CustomPage objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('c')
//            ->andWhere('c.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('c.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

}
