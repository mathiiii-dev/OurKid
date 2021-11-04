<?php

namespace App\Repository;

use App\Entity\DailyResume;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method DailyResume|null find($id, $lockMode = null, $lockVersion = null)
 * @method DailyResume|null findOneBy(array $criteria, array $orderBy = null)
 * @method DailyResume[]    findAll()
 * @method DailyResume[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class DailyResumeRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, DailyResume::class);
    }

    // /**
    //  * @return DailyResume[] Returns an array of DailyResume objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('d')
            ->andWhere('d.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('d.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?DailyResume
    {
        return $this->createQueryBuilder('d')
            ->andWhere('d.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
