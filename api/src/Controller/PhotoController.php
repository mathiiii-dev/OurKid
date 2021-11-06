<?php

namespace App\Controller;

use App\Entity\Photo;
use App\Repository\ActualityRepository;
use Doctrine\ORM\EntityManagerInterface;
use JetBrains\PhpStorm\NoReturn;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class PhotoController extends AbstractController
{
    private EntityManagerInterface $entityManager;
    private ActualityRepository $actualityRepository;

    public function __construct(EntityManagerInterface $entityManager, ActualityRepository $actualityRepository)
    {
        $this->entityManager = $entityManager;
        $this->actualityRepository = $actualityRepository;
    }

    #[NoReturn] #[Route('/photo', name: 'photo')]
    public function index(Request $request): Response
    {
        $request = json_decode($request->getContent(), true);
        $actuality = $this->actualityRepository->find(['id' => $request['actuality']]);
        $photo = new Photo();
        $photo->setUrl($request['id']);
        $photo->setActuality($actuality);
        $photo->setCreatedAt();

        $this->entityManager->persist($photo);
        $this->entityManager->flush();

        return new JsonResponse([
            'id' => $photo->getId()
        ]);
    }
}
