import unittest
import AdHere_Linux

class TestAdhere_Linux(unittest.TestCase):
    
    def test_SanityCheck(self):
        default_target = AdHere_Linux.SanityCheck(['AdHere_Linux.py'])
        given_target = AdHere_Linux.SanityCheck(['AdHere_Linux.py', 'targettest.com'])

        self.assertEqual('google.com', default_target)
        self.assertEqual('targettest.com', given_target)

if __name__ == '__main__':
    unittest.main()