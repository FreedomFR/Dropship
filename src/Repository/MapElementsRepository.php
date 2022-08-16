<?php

namespace App\Repository;

use App\Entity\MapElements;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method MapElements|null find($id, $lockMode = null, $lockVersion = null)
 * @method MapElements|null findOneBy(array $criteria, array $orderBy = null)
 * @method MapElements[]    findAll()
 * @method MapElements[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class MapElementsRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, MapElements::class);
    }

    // /**
    //  * @return MapElements[] Returns an array of MapElements objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('m')
            ->andWhere('m.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('m.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?MapElements
    {
        return $this->createQueryBuilder('m')
            ->andWhere('m.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
