import { useState } from 'react';
import { useMantineColorScheme } from '@mantine/core';
import { Navbar, Center, Tooltip, UnstyledButton, createStyles, Stack, rem, px } from '@mantine/core';
import { IconHome2, IconMoon, IconFilePlus, IconLogout, IconSunHigh } from '@tabler/icons-react';
import { Link } from "react-router-dom"
import useLogout from "../hooks/useLogout"

const useStyles = createStyles((theme) => ({
  link: {
    width: rem(50),
    height: rem(50),
    borderRadius: theme.radius.md,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.colors.dark[0],

    '&:hover': {
      backgroundColor: theme.colors.blue[5],
    },
  },

  active: {
    '&, &:hover': {
      backgroundColor: theme.colors.blue[5],
      color: theme.colors.dark[0],
    },
  },
}));

function NavbarLink({ icon: Icon, label, active, onClick }) {
  const { classes, cx } = useStyles();
  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
      <UnstyledButton onClick={onClick} className={cx(classes.link, { [classes.active]: active })}>
        <Icon size="1.25em" stroke={1.75} />
      </UnstyledButton>
    </Tooltip>
  );
}

const menuItems = [
  { icon: IconHome2, label: 'Home', route: "/home" },
  { icon: IconFilePlus, label: 'Add Note', route: "/create" },
];

export function SIdeBar() {
  const [active, setActive] = useState(0);

  const links = menuItems.map((link, index) => (
    <Link key={index} to={link.route}>
      <NavbarLink
        {...link}
        key={link.label}
        active={index === active}
        onClick={() => setActive(index)}
      />
    </Link>
  ));

  const { logout } = useLogout()

  function handleSumbit() {
    logout()
  }

  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';

  return ( 
    <Navbar height={"100vh"} width={{ base: 80 }} p="md" sx={(theme) => ({
      backgroundColor: theme.fn.variant({ variant: 'filled', color: theme.primaryColor })
        .background,
    })}>
      <Center>
      </Center>
      <Navbar.Section grow mt={0}>
        <Stack justify="center" spacing={10}>
          {links}
        </Stack>
      </Navbar.Section>
      <Navbar.Section>
        <Stack justify="center" spacing={10}>
          <NavbarLink onClick={() => toggleColorScheme()} icon={dark ? IconMoon : IconSunHigh} label="Toggle Theme" />
          <NavbarLink icon={IconLogout} label="Logout" onClick={handleSumbit} />
        </Stack>
      </Navbar.Section>
    </Navbar>
  );
}

export default SIdeBar