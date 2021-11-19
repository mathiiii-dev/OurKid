<?php

namespace App\Controller;

use App\Entity\Kid;
use App\Entity\User;
use App\Repository\KidRepository;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class RegistrationController extends AbstractController
{
    private UserPasswordHasherInterface $passwordHasher;
    private SerializerInterface $serializer;
    private EntityManagerInterface $entityManager;
    private KidRepository $kidRepository;
    private UserRepository $userRepository;
    private ValidatorInterface $validator;

    public function __construct(
        UserPasswordHasherInterface $passwordHasher,
        SerializerInterface         $serializer,
        EntityManagerInterface      $entityManager,
        KidRepository               $kidRepository,
        UserRepository              $userRepository,
        ValidatorInterface $validator
    )
    {
        $this->passwordHasher = $passwordHasher;
        $this->serializer = $serializer;
        $this->entityManager = $entityManager;
        $this->kidRepository = $kidRepository;
        $this->userRepository = $userRepository;
        $this->validator = $validator;
    }

    #[Route('/registration/parent', name: 'registration_parent', methods: 'POST')]
    public function registrationParent(Request $request): Response
    {
        /** @var User $user */
        $user = $this->serializer->deserialize($request->getContent(), User::class, 'json');
        $user->setPassword($this->passwordHasher->hashPassword($user, $user->getPassword()));

        $errors = $this->validator->validate($user);

        if (count($errors) > 0) {
            throw new BadRequestHttpException($errors->get(0)->getMessage());
        }

        $this->entityManager->persist($user);
        $this->entityManager->flush();

        return $this->json('User ' . $user->getId() . ' registered');
    }

    #[Route('/registration/kid', name: 'registration_kid', methods: 'POST')]
    public function registrationKid(Request $request): JsonResponse
    {
        /** @var Kid $kid */
        $kid = $this->serializer->deserialize($request->getContent(), Kid::class, 'json');
        $kid->setColor($this->random_color());
        $errors = $this->validator->validate($kid);

        if (count($errors) > 0) {
            throw new BadRequestHttpException($errors->get(0)->getMessage());
        }

        $this->entityManager->persist($kid);
        $this->entityManager->flush();

        return $this->json('Kid ' . $kid->getId() . ' registered');
    }

    #[Route('/registration/link', name: 'registration_link', methods: 'POST')]
    public function link(Request $request): JsonResponse
    {
        $kid = $this->kidRepository->find(['id' => $request->query->get('kidId')]);
        $parent = $this->userRepository->find(['id' => $request->query->get('parentId')]);

        $kid->addParent($parent);
        $parent->addKid($kid);

        $this->entityManager->flush();

        return $this->json('Kid ' . $kid->getId() . ' linked to Parent ' . $parent->getId());
    }

    #[Route('/parents', name: 'registration_parents_get', methods: 'GET')]
    public function parents(): Response
    {
        return new Response($this->serializer->serialize(
            $this->userRepository->findAll(), 'json', ['groups' => 'parent_link'])
        );
    }

    function random_color_part(): string
    {
        return str_pad( dechex( mt_rand( 0, 255 ) ), 2, '0', STR_PAD_LEFT);
    }

    function random_color(): string
    {
        return $this->random_color_part() . $this->random_color_part() . $this->random_color_part();
    }
}
