<?php

namespace App\Controller;

use App\Entity\Calendar;
use App\Repository\CalendarRepository;
use App\Repository\KidRepository;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\NonUniqueResultException;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

class CalendarController extends AbstractController
{
    private SerializerInterface $serializer;
    private KidRepository $kidRepository;
    private EntityManagerInterface $entityManager;
    private CalendarRepository $calendarRepository;

    public function __construct(SerializerInterface $serializer, KidRepository $kidRepository, EntityManagerInterface $entityManager, CalendarRepository $calendarRepository)
    {
        $this->serializer = $serializer;
        $this->kidRepository = $kidRepository;
        $this->entityManager = $entityManager;
        $this->calendarRepository = $calendarRepository;
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

    #[Route('/calendars', name: 'calendars', methods: 'GET')]
    public function calendars(): JsonResponse
    {
        return $this->json(json_decode($this->serializer->serialize($this->calendarRepository->findAll(), 'json', [
                'circular_reference_handler' => function ($object) {
                    return $object->getId();
                }
            ]))
        );
    }

    /**
     * @throws NonUniqueResultException
     */
    #[Route('/calendar/{id}', name: 'calendars', methods: 'GET')]
    public function calendar(int $id): JsonResponse
    {
        return $this->json(json_decode($this->serializer->serialize($this->calendarRepository->findKidsCalendarForParent($id), 'json', [
                'circular_reference_handler' => function ($object) {
                    return $object->getId();
                }
            ]))
        );
    }
}
