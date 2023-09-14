import { useState } from 'react';
import { ActionIcon, Center, useMantineColorScheme } from '@mantine/core';
import { Navbar, Group, Code, ScrollArea, createStyles, rem } from '@mantine/core';
import {IconHome2,IconMoon,IconFilePlus ,IconLogout, IconSunHigh, IconFolder, IconNotes, IconCalendarStats, IconGauge, IconPresentationAnalytics, IconFileAnalytics, IconAdjustments, IconLock, } from '@tabler/icons-react';
import { LinksGroup } from "../components/LinksGroup"
import useLogout from "../hooks/useLogout"
import {Link} from "react-router-dom"

const topLinksData = [
  { label: 'Home', icon: IconHome2 },
  { label: 'Add Note', icon: IconNotes },
  {
    label: 'Folders',
    icon: IconFolder,
    // initiallyOpened: true,
    links: [
      { label: 'Folder 1', link: '/' },
      { label: 'Folder 2', link: '/' },
    ],
  },
];

const useStyles = createStyles((theme) => ({
  navbar: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
    paddingBottom: 0,
  },

  header: {
    padding: theme.spacing.md,
    paddingTop: 0,
    marginLeft: `calc(${theme.spacing.md} * -1)`,
    marginRight: `calc(${theme.spacing.md} * -1)`,
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  links: {
    marginLeft: `calc(${theme.spacing.md} * -1)`,
    marginRight: `calc(${theme.spacing.md} * -1)`,
  },

  footer: {
      marginLeft: `calc(${theme.spacing.md} * -1)`,
      marginRight: `calc(${theme.spacing.md} * -1)`,
      borderTop: `${rem(1)} solid ${
        theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
      }`,
   },
}));


export function Nav() {
  const { classes } = useStyles();
  const { logout } = useLogout()

  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';

  const bottomLinksData = [
    { label: 'Theme', icon: dark ? IconMoon : IconSunHigh, click: toggleColorScheme },
    { label: 'Log Out', icon: IconLogout, click: logout },
  ]

  const topLinks = topLinksData.map((item) => <LinksGroup {...item} key={item.label} />);
  const bottomLinks = bottomLinksData.map((item) => <LinksGroup handleClick={item.click} {...item} key={item.label} />);

  return (
    <>
    {/* <Navbar height={"100vh"}  width={{ base: 80 }} p="md" sx={(theme) => ({
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
          <NavbarLink onClick={() => toggleColorScheme()} icon={  dark ? IconMoon : IconSunHigh } label="Toggle Theme" />
          <NavbarLink icon={IconLogout} label="Logout" onClick={handleSumbit}/>
        </Stack>
      </Navbar.Section>
    </Navbar> */}

    <Navbar height={"100vh"} width={{ sm: 250 }} px="md" className={classes.navbar}>
      <Navbar.Section className={classes.header}>
        <Group position="apart" mt={"md"}>
          <Code sx={{ fontWeight: 700 }}>v 0.2 Folders Implementatoin</Code>
        </Group>
      </Navbar.Section>

      <Navbar.Section grow className={classes.links} component={ScrollArea}>
        <div>{topLinks}</div>
      </Navbar.Section>

      <Navbar.Section className={classes.footer} >
      <div>{bottomLinks}</div>
      </Navbar.Section>
    </Navbar>
    </>
  );
}

export default Nav