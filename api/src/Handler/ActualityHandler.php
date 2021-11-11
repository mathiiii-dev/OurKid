<?php

namespace App\Handler;

use App\Entity\Actuality;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;

class ActualityHandler
{
    private EntityManagerInterface $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    public function handlerActualityCreate(Request $request): Actuality
    {
        $actuality = new Actuality();
        $actuality->setTitle($request->get('title'));
        $actuality->setDescription($request->get('description'));

        $this->entityManager->persist($actuality);
        $this->entityManager->flush();

        return $actuality;
    }
}
