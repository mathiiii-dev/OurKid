<?php

namespace App\Handler;

use App\Entity\Actuality;
use App\Entity\Photo;
use Doctrine\ORM\EntityManagerInterface;

class PhotoHandler
{
    private EntityManagerInterface $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    public function handlePhotoCreate(Actuality $actuality, string $fileName): Photo
    {
        $photo = new Photo();

        $photo->setUrl($fileName)
            ->setActuality($actuality)
            ->setCreatedAt(new \DateTimeImmutable());

        $this->entityManager->persist($photo);
        $this->entityManager->flush();

        return $photo;
    }
}
