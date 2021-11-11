<?php

namespace App\Controller;

use App\Entity\Actuality;
use App\Handler\ActualityHandler;
use App\Handler\PhotoHandler;
use App\Repository\ActualityRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\File\Exception\FileException;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\String\Slugger\SluggerInterface;

class ActualityController extends AbstractController
{
    private SerializerInterface $serializer;
    private SluggerInterface $slugger;
    private ActualityHandler $actualityHandler;
    private PhotoHandler $photoHandler;
    private ActualityRepository $actualityRepository;

    public function __construct(
        SluggerInterface    $slugger,
        SerializerInterface $serializer,
        ActualityHandler    $actualityHandler,
        PhotoHandler        $photoHandler,
        ActualityRepository $actualityRepository
    )
    {
        $this->serializer = $serializer;
        $this->slugger = $slugger;
        $this->actualityHandler = $actualityHandler;
        $this->photoHandler = $photoHandler;
        $this->actualityRepository = $actualityRepository;
    }

    #[Route('/actuality', name: 'actuality_create', methods: 'POST')]
    public function create(Request $request): JsonResponse
    {
        $actuality = $this->actualityHandler->handlerActualityCreate($request);

        $files = $request->files;

        /* @var UploadedFile $file */
        foreach ($files as $file) {
            $safeFilename = $this->slugger->slug($file->getClientOriginalName());
            $fileName = $safeFilename . '-' . uniqid() . '.' . $file->guessExtension();

            $this->photoHandler->handlePhotoCreate($actuality, $fileName);

            try {
                $file->move($this->getParameter('upload_directory'), $fileName);
            } catch (FileException $e) {
                throw new \Exception($e->getMessage());
            }
        }

        return new JsonResponse([
            'id' => $actuality->getId()
        ]);
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
        return $this->json(json_decode($this->serializer->serialize($this->actualityRepository->findAll(), 'json', [
                'circular_reference_handler' => function ($object) {
                    return $object->getId();
                }
            ]))
        );
    }
}
