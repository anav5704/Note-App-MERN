import { useState } from 'react';
import { Navbar, Center, Tooltip, UnstyledButton, createStyles, Stack, rem, px } from '@mantine/core';
import {IconHome2,IconGauge,IconDeviceDesktopAnalytics,IconFingerprint,IconCalendarStats,IconUser,IconSettings,IconLogout,IconSwitchHorizontal,} from '@tabler/icons-react';
import useLogout from "../hooks/useLogout"

const useStyles = createStyles((theme) => ({
  link: {
    width: rem(50),
    height: rem(50),
    borderRadius: theme.radius.md,
    display: 'flex',  
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.blue[5] : theme.colors.gray[0],
    },
  },

  active: {
    '&, &:hover': {
      backgroundColor: theme.colors.blue[5],
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
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

const mockdata = [
  { icon: IconHome2, label: 'Home' },
  { icon: IconUser, label: 'Account' },
  { icon: IconFingerprint, label: 'Security' },
  { icon: IconSettings, label: 'Settings' },
];

export function Nav() {
  const [active, setActive] = useState(0);

  const links = mockdata.map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={index === active}
      onClick={() => setActive(index)}
    />
  ));

  const { logout } = useLogout()

  function handleSumbit(){
    logout()
  }

  return (
    <Navbar height={"100vh"}  width={{ base: 80 }} p="md" sx={(theme) => ({
      backgroundColor: theme.fn.variant({ variant: 'filled', color: theme.primaryColor })
        .background,
    })}> 
      <Center>
        {/* <MantineLogo type="mark" size={30} /> */}
      </Center>
      <Navbar.Section grow mt={0}>
        <Stack justify="center" spacing={10}>
          {links}
        </Stack>
      </Navbar.Section>
      <Navbar.Section>
        <Stack justify="center" spacing={10}>
          <NavbarLink icon={IconSwitchHorizontal} label="Change account" />
          <NavbarLink icon={IconLogout} label="Logout" onClick={handleSumbit}/>
        </Stack>
      </Navbar.Section>
    </Navbar>
  );
}

export default Nav