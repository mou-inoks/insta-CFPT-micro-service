<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInit587e4e7cb1b122d6cedd74ac6beb4b10
{
    public static $prefixLengthsPsr4 = array (
        'A' => 
        array (
            'Api\\Cfpt\\' => 9,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'Api\\Cfpt\\' => 
        array (
            0 => __DIR__ . '/../..' . '/src',
        ),
    );

    public static $classMap = array (
        'Composer\\InstalledVersions' => __DIR__ . '/..' . '/composer/InstalledVersions.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInit587e4e7cb1b122d6cedd74ac6beb4b10::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInit587e4e7cb1b122d6cedd74ac6beb4b10::$prefixDirsPsr4;
            $loader->classMap = ComposerStaticInit587e4e7cb1b122d6cedd74ac6beb4b10::$classMap;

        }, null, ClassLoader::class);
    }
}
