<?php

namespace App\Entity;

use App\Repository\DailyResumeRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=DailyResumeRepository::class)
 */
class DailyResume
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"resumes"})
     */
    private $id;

    /**
     * @ORM\Column(type="text")
     * @Groups({"resumes"})
     */
    private $resume;

    /**
     * @ORM\Column(type="datetime_immutable")
     * @Groups({"resumes"})
     */
    private $createdAt;

    /**
     * @ORM\ManyToOne(targetEntity=Kid::class, inversedBy="dailyResumes")
     */
    private $kid;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getResume(): ?string
    {
        return $this->resume;
    }

    public function setResume(string $resume): self
    {
        $this->resume = $resume;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeImmutable $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getKid(): ?Kid
    {
        return $this->kid;
    }

    public function setKid(?Kid $kid): self
    {
        $this->kid = $kid;

        return $this;
    }
}
