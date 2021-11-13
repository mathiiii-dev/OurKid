<?php

namespace App\Controller;

use App\Repository\KidRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

class KidController extends AbstractController
{
    private SerializerInterface $serializer;
    private KidRepository $kidRepository;

    public function __construct(SerializerInterface $serializer, KidRepository $kidRepository)
    {
        $this->serializer = $serializer;
        $this->kidRepository = $kidRepository;
    }

    #[Route('/kids', name: 'kids', methods: 'GET')]
    public function kids(): Response
    {
        return new Response($this->serializer->serialize(
            $this->kidRepository->findAll(), 'json', ['groups' => 'kid_link'])
        );
    }

    #[Route('/kid/{id}', name: 'kid', methods: 'GET')]
    public function kid(int $id): Response
    {
        return new Response($this->serializer->serialize(
            $this->kidRepository->find(['id' => $id]), 'json', ['groups' => 'kid_link'])
        );
    }
}
