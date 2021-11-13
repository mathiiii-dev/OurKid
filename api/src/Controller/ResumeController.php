<?php

namespace App\Controller;

use App\Handler\ResumeHandler;
use App\Repository\DailyResumeRepository;
use App\Repository\KidRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

class ResumeController extends AbstractController
{
    private KidRepository $kidRepository;
    private ResumeHandler $resumeHandler;
    private DailyResumeRepository $resumeRepository;
    private SerializerInterface $serializer;

    public function __construct(
        KidRepository $kidRepository,
        ResumeHandler $resumeHandler,
        DailyResumeRepository $resumeRepository,
        SerializerInterface $serializer
    ) {
        $this->kidRepository = $kidRepository;
        $this->resumeHandler = $resumeHandler;
        $this->resumeRepository = $resumeRepository;
        $this->serializer = $serializer;
    }

    #[Route('/resume/kid/{id}', name: 'resume_kid_post', methods: 'POST')]
    public function resume(Request $request, int $id): JsonResponse
    {
        $kid = $this->kidRepository->find(['id' => $id]);

        $resume = $this->resumeHandler->handleResumeCreate($request, $kid);

        return $this->json('Resume ' . $resume->getId() . ' created');
    }

    #[Route('/resume/kid/{id}', name: 'resume_kid_get', methods: 'GET')]
    public function resumes(int $id): Response
    {
        return new Response($this->serializer->serialize(
            $this->resumeRepository->findBy(['kid' => $id]), 'json', ['groups' => 'resumes'])
        );
    }
}
