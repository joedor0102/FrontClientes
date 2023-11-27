import { ClienteDTO } from './cliente-dto.model';

describe('ClienteDTO', () => {
  it('should create an instance', () => {
    expect( new ClienteDTO("sss", "sss", "sss", 0, "sss", "ssss", "ssss", 1)).toBeTruthy();
  });
});
