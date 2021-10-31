import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuIcon,
    MenuCommand,
    MenuDivider, Button,
} from "@chakra-ui/react"

const Navbar = () => {
    return (
        <Menu>
            <MenuButton as={Button}>
                Inscription
            </MenuButton>
            <MenuButton as={Button}>
                Connexion
            </MenuButton>
        </Menu>
    )
}

export default Navbar
