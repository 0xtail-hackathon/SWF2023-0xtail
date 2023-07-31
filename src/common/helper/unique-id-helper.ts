import { Repository } from 'typeorm';

const MAX_TRY = 1000;
const ID_LENGTH = 19;

function generateRandomDigit(length: number) {
  let id = '';

  // NOTE: 첫자리는 0이 아니여야 한다.
  while (!id || id === '0') {
    id = String(Math.floor(Math.random() * 10));
  }

  for (let index = 1; index < length; index += 1) {
    id += String(Math.floor(Math.random() * 10));
  }

  return id;
}

// NOTE: (2 ** 64) - 1 은 mysql bigint type 컬럼의 최대값이고 20자리이다. 20자로 설정할 경우 가장 높은 자리는 무조건 1이므로 변별력이 없다. 따라서 19자리 ID를 만든다.
// 물론 이렇게 하면 uuid 만큼의 엔트로피는 나오지 않으므로 중복이 발생할 수 있다
// 이를 방지하기 위해 repository 로 실제 DB 억세스를 통해 중복없는 ID를 생성하는 helper 함수를 추가함
// 레거시 테이블들이 이런 ID 를 사용하는 이유는 잘 모르겠지만, UUID 타입의 ID 보다 쿼리 속도가 빠르다고 한다.
export async function generateUniqueId(repository: Repository<unknown>): Promise<string> {
  let unique = false;
  let tryCount = 0;
  let id = '';

  while (!unique && tryCount < MAX_TRY) {
    tryCount += 1;
    id = generateRandomDigit(ID_LENGTH);
    const found = await repository.findOneBy(id);
    if (!found) {
      unique = true;
    }
  }

  if (!unique) {
    throw new Error('Failed to generate unique id');
  }

  return id;
}
