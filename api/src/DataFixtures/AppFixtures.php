<?php

namespace App\DataFixtures;

use App\Entity\Kid;
use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $faker = Factory::create();

        for ($i = 0; $i < 20; $i++) {
            $kid = new Kid();
            $kid->setFirstname($faker->firstName)
                ->setLastname($faker->lastName)
                ->setBirthday($faker->dateTime)
                ->setColor($this->random_color());;

            $manager->persist($kid);

            $parent = new User();
            $parent->setLastname($faker->lastName)
                ->setFirstname($faker->firstName)
                ->setPassword('password')
                ->setEmail($faker->email);

            $manager->persist($parent);
        }
        $manager->flush();
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
