<?php

namespace App\Controller;

use App\Entity\Actuality;
use App\Repository\ActualityRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

class ActualityController extends AbstractController
{
    private SerializerInterface $serializer;
    private EntityManagerInterface $entityManager;
    private ActualityRepository $actualityRepository;

    public function __construct(SerializerInterface $serializer, EntityManagerInterface $entityManager, ActualityRepository $actualityRepository)
    {
        $this->serializer = $serializer;
        $this->entityManager = $entityManager;
        $this->actualityRepository = $actualityRepository;
    }

    #[Route('/actuality', name: 'actuality_create', methods: 'POST')]
    public function create(Request $request): Response
    {
        /** @var Actuality $actuality */
        $actuality = $this->serializer->deserialize($request->getContent(), Actuality::class, 'json');

        $this->entityManager->persist($actuality);
        $this->entityManager->flush();

        return $this->json('Actuality '.$actuality->getId(). ' created');
    }

    #[Route('/actuality/{id}', name: 'actuality', methods: 'GET')]
    public function actuality(int $id): JsonResponse
    {
        /** @var Actuality $actuality */
        $actuality = $this->serializer->serialize($this->actualityRepository->find(['id' => $id]), 'json');
        return $this->json($actuality);
    }

    #[Route('/actuality', name: 'actuality', methods: 'GET')]
    public function actualities(): JsonResponse
    {
        return $this->json($this->actualityRepository->findAll());
    }
}
