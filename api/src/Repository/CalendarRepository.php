<?php

namespace App\Repository;

use App\Entity\Calendar;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Calendar|null find($id, $lockMode = null, $lockVersion = null)
 * @method Calendar|null findOneBy(array $criteria, array $orderBy = null)
 * @method Calendar[]    findAll()
 * @method Calendar[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class CalendarRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Calendar::class);
    }

    public function findKidsCalendarForParent(int $id): array
    {
        $conn = $this->getEntityManager()->getConnection();

        $sql = '
            select * from Calendar c
            inner join kid k on k.id = c.kid_id
            inner join kid_user ku on k.id = ku.kid_id
            where ku.user_id = :id
            ';
        $stmt = $conn->prepare($sql);

        return $stmt->executeQuery(['id' => $id])->fetchAllAssociative();
    }

}
