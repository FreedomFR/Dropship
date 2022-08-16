<?php

namespace App\Repository;

use App\Entity\AccueilPage;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method AccueilPage|null find($id, $lockMode = null, $lockVersion = null)
 * @method AccueilPage|null findOneBy(array $criteria, array $orderBy = null)
 * @method AccueilPage[]    findAll()
 * @method AccueilPage[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class AccueilPageRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, AccueilPage::class);
    }

    // /**
    //  * @return AccueilPage[] Returns an array of AccueilPage objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('a')
            ->andWhere('a.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('a.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?AccueilPage
    {
        return $this->createQueryBuilder('a')
            ->andWhere('a.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
