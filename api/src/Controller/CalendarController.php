<?php

namespace App\Controller;

use App\Entity\Calendar;
use App\Repository\KidRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

class CalendarController extends AbstractController
{
    private SerializerInterface $serializer;
    private KidRepository $kidRepository;
    private EntityManagerInterface $entityManager;

    public function __construct(SerializerInterface $serializer, KidRepository $kidRepository, EntityManagerInterface $entityManager)
    {
        $this->serializer = $serializer;
        $this->kidRepository = $kidRepository;
        $this->entityManager = $entityManager;
    }

    #[Route('/calendar/kid/{id}', name: 'calendar', methods: 'POST')]
    public function index(Request $request, int $id): Response
    {
        $kid = $this->kidRepository->find(['id' => $id]);

        /**
         * @var $calendar Calendar
         */
        $calendar = $this->serializer->deserialize($request->getContent(), Calendar::class, 'json');
        $calendar->setKid($kid);

        $this->entityManager->persist($calendar);
        $this->entityManager->flush();

        return $this->json('Calendar ' . $calendar->getId() . 'created');
    }
}
