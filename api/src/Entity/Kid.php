<?php

namespace App\Entity;

use App\Repository\KidRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use JetBrains\PhpStorm\Pure;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass=KidRepository::class)
 */
class Kid
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"kid_link"})
     */
    private int $id;

    /**
     * @Groups({"kid_link"})
     * @ORM\Column(type="string", length=255)
     * @Assert\NotBlank(message="Veuillez saisir un prénom")
     */
    private string $firstname;

    /**
     * @Groups({"kid_link"})
     * @ORM\Column(type="string", length=255)
     * @Assert\NotBlank(message="Veuillez saisir un nom")
     */
    private string $lastname;

    /**
     * @ORM\Column(type="datetime")
     * @Assert\NotBlank(message="Veuillez saisir une date de naissance")
     * @Groups({"kid_link"})
     */
    private \DateTimeInterface $birthday;

    /**
     * @ORM\ManyToMany(targetEntity=User::class, inversedBy="kids")
     */
    private $parent;

    /**
     * @ORM\OneToMany(targetEntity=Calendar::class, mappedBy="kid", orphanRemoval=true)
     */
    private $calendars;

    /**
     * @ORM\OneToMany(targetEntity=DailyResume::class, mappedBy="kid")
     */
    private $dailyResumes;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $color;

    #[Pure] public function __construct()
    {
        $this->parent = new ArrayCollection();
        $this->calendars = new ArrayCollection();
        $this->dailyResumes = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getFirstname(): ?string
    {
        return $this->firstname;
    }

    public function setFirstname(string $firstname): self
    {
        $this->firstname = $firstname;

        return $this;
    }

    public function getLastname(): ?string
    {
        return $this->lastname;
    }

    public function setLastname(string $lastname): self
    {
        $this->lastname = $lastname;

        return $this;
    }

    public function getBirthday(): ?\DateTimeInterface
    {
        return $this->birthday;
    }

    public function setBirthday(\DateTimeInterface $birthday): self
    {
        $this->birthday = $birthday;

        return $this;
    }

    /**
     * @return Collection|User[]
     */
    public function getParent(): Collection
    {
        return $this->parent;
    }

    public function addParent(User $parent): self
    {
        if (!$this->parent->contains($parent)) {
            $this->parent[] = $parent;
        }

        return $this;
    }

    public function removeParent(User $parent): self
    {
        $this->parent->removeElement($parent);

        return $this;
    }

    /**
     * @return Collection|Calendar[]
     */
    public function getCalendars(): Collection
    {
        return $this->calendars;
    }

    public function addCalendar(Calendar $calendar): self
    {
        if (!$this->calendars->contains($calendar)) {
            $this->calendars[] = $calendar;
            $calendar->setKid($this);
        }

        return $this;
    }

    public function removeCalendar(Calendar $calendar): self
    {
        if ($this->calendars->removeElement($calendar)) {
            // set the owning side to null (unless already changed)
            if ($calendar->getKid() === $this) {
                $calendar->setKid(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|DailyResume[]
     */
    public function getDailyResumes(): Collection
    {
        return $this->dailyResumes;
    }

    public function addDailyResume(DailyResume $dailyResume): self
    {
        if (!$this->dailyResumes->contains($dailyResume)) {
            $this->dailyResumes[] = $dailyResume;
            $dailyResume->setKid($this);
        }

        return $this;
    }

    public function removeDailyResume(DailyResume $dailyResume): self
    {
        if ($this->dailyResumes->removeElement($dailyResume)) {
            // set the owning side to null (unless already changed)
            if ($dailyResume->getKid() === $this) {
                $dailyResume->setKid(null);
            }
        }

        return $this;
    }

    public function getColor(): ?string
    {
        return $this->color;
    }

    public function setColor(string $color): self
    {
        $this->color = $color;

        return $this;
    }
}
