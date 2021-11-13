<?php

namespace App\Handler;

use App\Entity\DailyResume;
use App\Entity\Kid;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;

class ResumeHandler
{
    private EntityManagerInterface $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    public function handleResumeCreate(Request $request, Kid $kid): DailyResume
    {
        $resume = new DailyResume();
        $resume->setResume($request->getContent())
            ->setKid($kid)
            ->setCreatedAt(new \DateTimeImmutable());

        $this->entityManager->persist($resume);
        $this->entityManager->flush();

        return $resume;
    }
}
