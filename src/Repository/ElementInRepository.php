<?php

namespace App\Repository;

use App\Entity\ElementIn;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method ElementIn|null find($id, $lockMode = null, $lockVersion = null)
 * @method ElementIn|null findOneBy(array $criteria, array $orderBy = null)
 * @method ElementIn[]    findAll()
 * @method ElementIn[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ElementInRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, ElementIn::class);
    }

    // /**
    //  * @return ElementIn[] Returns an array of ElementIn objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('e')
            ->andWhere('e.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('e.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?ElementIn
    {
        return $this->createQueryBuilder('e')
            ->andWhere('e.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
