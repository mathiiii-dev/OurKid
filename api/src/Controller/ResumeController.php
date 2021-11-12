<?php

namespace App\Controller;

use App\Entity\DailyResume;
use App\Repository\KidRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ResumeController extends AbstractController
{
    private KidRepository $kidRepository;
    private EntityManagerInterface $entityManager;

    public function __construct(KidRepository $kidRepository, EntityManagerInterface $entityManager)
    {
        $this->kidRepository = $kidRepository;
        $this->entityManager = $entityManager;
    }

    #[Route('/resume/kid/{id}', name: 'registration_kid', methods: 'POST')]
    public function resume(Request $request, int $id): JsonResponse
    {
        $kid = $this->kidRepository->find(['id' => $id]);

        $resume = new DailyResume();
        $resume->setResume($request->getContent())
            ->setKid($kid)
            ->setCreatedAt(new \DateTimeImmutable());

        $this->entityManager->persist($resume);
        $this->entityManager->flush();

        return $this->json('Resume ' . $resume->getId() . ' created');
    }
}
